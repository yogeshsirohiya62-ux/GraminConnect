import React, { useState, useEffect } from 'react';
import useStore from '../store';

const ForumView = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Crop Health');
  const [showPostForm, setShowPostForm] = useState(false);

  const { user } = useStore();

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/data/forum');
      if (res.ok) setPosts(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const res = await fetch('/api/data/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          village: user ? user.village : 'Gurha Barsal'
        })
      });

      if (res.ok) {
        setTitle('');
        setContent('');
        setShowPostForm(false);
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', color: '#0f172a' }}>💬 Kisan Chopal (कृषि संवाद मंच)</h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
            Ask questions, seek farming advice, and get answers from agricultural experts
          </p>
        </div>

        <button 
          onClick={() => setShowPostForm(!showPostForm)}
          style={{ padding: '8px 16px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
        >
          {showPostForm ? '✕ Close Form' : '✍️ Ask Question'}
        </button>
      </div>

      {showPostForm && (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '16px' }}>Post Your Farming Question</h3>
          <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Question title (e.g., Treatment for Wheat yellow rust?)..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
              >
                <option value="Crop Health">Crop Health (फसल सुरक्षा)</option>
                <option value="Irrigation">Irrigation & Water</option>
                <option value="Harvesting">Harvesting & Storage</option>
                <option value="Market">Market & Selling</option>
              </select>
            </div>
            <textarea 
              placeholder="Describe your issue in detail (crop age, symptoms, fertilizers applied)..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={3}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit' }}
            />
            <button type="submit" style={{ alignSelf: 'flex-start', padding: '10px 20px', background: '#0f766e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              Post Question
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading Chopal discussions...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map((p) => (
            <div key={p.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>👤</span>
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>{p.author}</span>
                    <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '6px' }}>📍 {p.village}</span>
                  </div>
                </div>
                <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                  {p.category}
                </span>
              </div>

              <h4 style={{ margin: '8px 0 6px', fontSize: '16px', color: '#1e293b' }}>{p.title}</h4>
              <p style={{ margin: '0 0 14px', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>{p.content}</p>

              {/* Replies */}
              {p.replies && p.replies.length > 0 && (
                <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '14px', marginTop: '12px', borderLeft: '4px solid #10b981' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#065f46' }}>
                      {p.replies[0].isExpert ? '👨‍🌾 Krishi Expert Advisory' : '💬 Farmer Response'}:
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{p.replies[0].author}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#334155' }}>{p.replies[0].text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumView;
