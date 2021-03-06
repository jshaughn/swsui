import * as React from 'react';
import ServiceInfoCard from './ServiceInfoCard';
import { Link } from 'react-router-dom';
import { Source } from '../../../types/ServiceInfo';

interface ServiceInfoRoutesProps {
  dependencies?: Source[];
}

class ServiceInfoRoutes extends React.Component<ServiceInfoRoutesProps> {
  constructor(props: ServiceInfoRoutesProps) {
    super(props);
  }

  render() {
    return (
      <ServiceInfoCard
        iconType="pf"
        iconName="route"
        title="Source Services"
        items={Object.keys(this.props.dependencies || new Map()).map((key, u) => (
          <div key={'dependencies_' + u}>
            <div className="progress-description">
              <strong>To: </strong> {key}
            </div>
            <ul style={{ listStyleType: 'none' }}>
              {(this.props.dependencies ? this.props.dependencies[key] : []).map((dependency, i) => {
                let nVersion = dependency.indexOf('/');
                let nNamespace = dependency.indexOf('.');
                let servicename = dependency.substring(0, nNamespace);
                let namespace = dependency.substring(nNamespace + 1, nVersion);
                if (servicename.length > 0 && namespace.length > 0) {
                  let to = '/namespaces/' + namespace + '/services/' + servicename;
                  return (
                    <Link key={to} to={to}>
                      <li key={'dependencies_' + u + '_dependency_' + i}>{dependency}</li>
                    </Link>
                  );
                } else {
                  return <li key={'dependencies_' + u + '_dependency_' + i}>{dependency}</li>;
                }
              })}
            </ul>
          </div>
        ))}
      />
    );
  }
}

export default ServiceInfoRoutes;
