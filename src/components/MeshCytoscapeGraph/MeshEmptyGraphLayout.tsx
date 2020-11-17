import * as React from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, Title } from '@patternfly/react-core';
import { style } from 'typestyle';
import * as _ from 'lodash';
import { KialiIcon } from '../../config/KialiIcon';
import { DecoratedMeshGraphElements } from '../../types/MeshGraph';

type EmptyMeshGraphLayoutProps = {
  elements?: DecoratedMeshGraphElements;
  action?: any;
  isLoading?: boolean;
  isError: boolean;
  error?: string;
};

const emptyStateStyle = style({
  height: '98%',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginBottom: 10,
  marginTop: 10
});

type EmptyMeshGraphLayoutState = {};

export default class EmptyMeshGraphLayout extends React.Component<
  EmptyMeshGraphLayoutProps,
  EmptyMeshGraphLayoutState
> {
  shouldComponentUpdate(nextProps: EmptyMeshGraphLayoutProps) {
    const currentIsEmpty = this.props.elements === undefined || _.isEmpty(this.props.elements.nodes);
    const nextIsEmpty = nextProps.elements === undefined || _.isEmpty(nextProps.elements.nodes);

    // Update if we have elements and we are not loading
    if (!nextProps.isLoading && !nextIsEmpty) {
      return true;
    }

    // Update if we are going from having no elements to having elements or vice versa
    if (currentIsEmpty !== nextIsEmpty) {
      return true;
    }
    // Do not update if we have elements and the namespace didn't change, as this means we are refreshing
    return !(!nextIsEmpty && _.isEqual(this.props.namespaces, nextProps.namespaces));
  }

  render() {
    if (this.props.isError) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <EmptyStateIcon icon={KialiIcon.Error} />
          <Title headingLevel="h5" size="lg">
            Error loading Mesh Graph
          </Title>
          <EmptyStateBody>{this.props.error}</EmptyStateBody>
        </EmptyState>
      );
    }
    if (this.props.isLoading) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            Loading mesh Graph
          </Title>
        </EmptyState>
      );
    }

    const isGraphEmpty = !this.props.elements || !this.props.elements.nodes || this.props.elements.nodes.length < 1;

    if (isGraphEmpty) {
      return (
        <EmptyState variant={EmptyStateVariant.large} className={emptyStateStyle}>
          <Title headingLevel="h5" size="lg">
            Empty Graph
          </Title>
          <EmptyStateBody>
            There is currently no mesh graph available. This typically means the mesh configuration is unavailable.
          </EmptyStateBody>
        </EmptyState>
      );
    }

    return this.props.children;
  }
}
