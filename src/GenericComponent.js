'use strict';

import Wrappers from './wrappers';
import ReactMultiChild from 'react/lib/ReactMultiChild';

const GenericComponent = function(element) {
  this.node = null;
  this._mountImage = null;
  this._renderedChildren = null;
  this._currentElement = element;
};

const GenericComponentMixin = {
  getPublicInstance() {
    return this.node;
  },

  mountComponent(transaction, nativeParent, nativeContainerInfo, context) {
    const node = this.node = this._currentElement;
    const {children, ...props} = node.props;

    new Wrappers[node.type](node, context).mountComponent();

    this.mountChildren(children, transaction, context);

    return node;
  },
  // There is no updating for PDF file
  receiveComponent(){},
  // There is no native node
  getHostNode() {},
  // How do you unmount PDF?
  unmountComponent() {},
};

Object.assign(
  GenericComponent.prototype,
  GenericComponentMixin,
  ReactMultiChild.Mixin
);

export default GenericComponent;
