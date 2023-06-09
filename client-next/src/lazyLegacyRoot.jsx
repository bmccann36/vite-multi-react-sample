
import React from 'react_v16';
import { useContext, useMemo, useRef, useLayoutEffect } from 'react';
import { __RouterContext } from 'react-router';
import { ReactReduxContext } from 'react-redux';

import ThemeContext from '../../ThemeContext';

let rendererModule = {
  status: 'pending',
  promise: null,
  result: null,
};

export default function lazyLegacyRoot(getLegacyComponent) {
  let componentModule = {
    status: 'pending',
    promise: null,
    result: null,
  };

  return function Wrapper(props) {

    const createLegacyRoot = readModule(rendererModule, () =>
      import('@greenspark/client-legacy/src/createLegacyRoot.jsx')
    ).default;

    const Component = readModule(componentModule, getLegacyComponent).default;
    const containerRef = useRef(null);
    const rootRef = useRef(null);

    // Populate every contexts we want the legacy subtree to see.
    // Then in src/legacy/createLegacyRoot we will apply them.
    const theme = useContext(ThemeContext);
    const router = useContext(__RouterContext);
    const reactRedux = useContext(ReactReduxContext);
    const context = useMemo(
      () => ({
        theme,
        router,
        reactRedux,
      }),
      [theme, router, reactRedux]
    );

    // Create/unmount.
    useLayoutEffect(() => {
      if (!rootRef.current) {
        rootRef.current = createLegacyRoot(containerRef.current);
      }
      const root = rootRef.current;
      return () => {
        root.unmount();
      };
    }, [createLegacyRoot]);

    // Mount/update.
    useLayoutEffect(() => {
      if (rootRef.current) {
        rootRef.current.render(Component, props, context);
      }
    }, [Component, props, context]);

    return <div style={{ display: 'contents' }} ref={containerRef} />;
  };
}

// This is similar to React.lazy, but implemented manually.
// We use this to Suspend rendering of this component until
// we fetch the component and the legacy React to render it.
function readModule(record, pendingModuleImport) {
  if (record.status === 'fulfilled') {
    return record.result;
  }
  if (record.status === 'rejected') {
    throw record.result;
  }
  if (!record.promise) {
    record.promise = pendingModuleImport().then(
      resolvedImport => {
        console.log('resolved async import', resolvedImport);
        if (record.status === 'pending') {
          record.status = 'fulfilled';
          record.promise = null;
          record.result = resolvedImport;
        }
      },
      error => {
        if (record.status === 'pending') {
          record.status = 'rejected';
          record.promise = null;
          record.result = error;
        }
      }
    );
  }
  throw record.promise;
}
