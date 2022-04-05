import React, { useState } from 'react';
import axios from 'axios';
import CountryVisualization from '../components/CountryVisualization';
import PieChart from '../components/PieChart';

interface linkStat {
  url: string;
  alias: string;
  clicks: number;
  collection: string;
  analytics: {
    countries: {
      [key: string]: any;
    };
    referers: {
      [key: string]: any;
    };
    devices: {
      [key: string]: any;
    };
    operatingSystems: {
      [key: string]: any;
    };
    browsers: {
      [key: string]: any;
    };
    langauges: {
      [key: string]: any;
    };
  };
}

const AnalyticsPage: React.FC = () => {
  const defaultStats: linkStat = {
    url: '',
    alias: '',
    clicks: 0,
    collection: '',
    analytics: {
      countries: {},
      referers: {},
      devices: {},
      operatingSystems: {},
      browsers: {},
      langauges: {},
    },
  };

  const [linkData, setLinkData]: [linkStat, (stats: linkStat) => void] =
    useState<linkStat>(defaultStats);

  const [error, setError]: [string, (error: string) => void] = useState('');

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);

  React.useEffect(() => {
    axios
      .get('/v1/track/RvJq_SLkKS')
      .then((res) => {
        setLinkData(res.data.stats);
        setLoading(false);
      })
      .catch((e) => {
        const err =
          e.response.status === 404
            ? 'Resource Not found'
            : 'An unexpected error has occurred';
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <>
          {/* add loading animation} */}
          <h2>Loading</h2>
          <p>Please wait</p>
        </>
      ) : error ? (
        <>
          {/* add 404 page */}
          <h2>{error}</h2>
        </>
      ) : (
        <>
          <h2>Analytics for {linkData.url}</h2>
          <p>In collection {linkData.collection}</p>
          <p>alias = {linkData.alias}</p>
          <div style={{ height: '400px' }}>
            <CountryVisualization data={linkData.analytics.countries} />
          </div>
          <div style={{ height: '400px' }}>
            <PieChart data={linkData.analytics.browsers} />
          </div>
          <div style={{ height: '400px' }}>
            <PieChart data={linkData.analytics.referers} />
          </div>
          <div style={{ height: '400px' }}>
            <PieChart data={linkData.analytics.devices} />
          </div>
          <div style={{ height: '400px' }}>
            <PieChart data={linkData.analytics.operatingSystems} />
          </div>
        </>
      )}
    </>
  );
};

export default AnalyticsPage;
