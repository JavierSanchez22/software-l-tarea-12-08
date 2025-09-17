// src/interfaces/components/UserDashboard.tsx
'use client';
import React, { useState } from 'react';
import UserForm from './UserForm';
import UserSearch from './UserSearch';
import BookSearch from './BookSearch';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'search' | 'books'>('create');

  return (
    <div className="dashboard">
      <nav className="tabs">
        <button onClick={() => setActiveTab('create')}>Crear Usuario</button>
        <button onClick={() => setActiveTab('search')}>Buscar Usuario</button>
        <button onClick={() => setActiveTab('books')}>Buscar Libros</button>
      </nav>

      <div className="tab-content">
        {activeTab === 'create' && <UserForm />}
        {activeTab === 'search' && <UserSearch />}
        {activeTab === 'books' && <BookSearch />}
      </div>
    </div>
  );
};

export default UserDashboard;