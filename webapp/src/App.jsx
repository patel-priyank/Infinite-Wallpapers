import { useEffect, useRef, useState } from 'react';

import { Alert, Card, Layout, Masonry, Spin, Typography } from 'antd';

import './App.css';

const { Meta } = Card;
const { Content, Header } = Layout;
const { Paragraph, Title } = Typography;

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadingRef = useRef(loading);
  const fetchedPages = useRef(new Set());

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    const fetchImages = async () => {
      if (fetchedPages.current.has(page)) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/wallpapers?page=${page}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));

          const errMsg = errorData.errors ? errorData.errors[0] : 'Failed to fetch';

          throw new Error(errMsg);
        }

        const data = await response.json();

        setImages(prev => [...prev, ...data]);

        fetchedPages.current.add(page);
      } catch (err) {
        setError(err.message);

        setPage(prev => Math.max(1, prev - 1));
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && !loadingRef.current) {
        loadingRef.current = true;

        setPage(prev => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={4} style={{ margin: 0 }}>
          Infinite Wallpapers
        </Title>
      </Header>

      <Content className="content">
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          gutter={16}
          items={images.map((image, index) => ({
            key: `${image.id}-${index}`,
            data: image
          }))}
          itemRender={item => (
            <a className="card-link" href={item.data.links.html} target="_blank" rel="noopener noreferrer">
              <Card className="card" hoverable cover={<img draggable={false} src={item.data.urls.small} />}>
                <Meta
                  description={
                    <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                      {item.data.alt_description || 'Wallpaper'}
                    </Paragraph>
                  }
                />
              </Card>
            </a>
          )}
        />

        {loading && (
          <div className="loader">
            <Spin size="large" />
          </div>
        )}

        {error && (
          <div style={{ paddingTop: images.length > 0 ? '32px' : '0' }}>
            <Alert type="error" title={error} showIcon />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default App;
