import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Folder, 
  Star, 
  Share,
  MoreHorizontal,
  Edit3,
  Eye
} from 'lucide-react';

const Docs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const documents = [
    {
      id: '1',
      title: 'Product Requirements Document',
      type: 'document',
      lastModified: '2 hours ago',
      author: 'Sarah Kim',
      starred: true,
      tags: ['product', 'requirements'],
      preview: 'Comprehensive overview of product features and user requirements for the upcoming MVP launch...'
    },
    {
      id: '2',
      title: 'API Documentation',
      type: 'document',
      lastModified: '1 day ago',
      author: 'Mike Johnson',
      starred: false,
      tags: ['technical', 'api'],
      preview: 'Complete API reference guide including endpoints, authentication, and response formats...'
    },
    {
      id: '3',
      title: 'Design System Guidelines',
      type: 'document',
      lastModified: '3 days ago',
      author: 'Emma Davis',
      starred: true,
      tags: ['design', 'guidelines'],
      preview: 'Brand guidelines, color palette, typography, and component specifications for consistent UI...'
    },
    {
      id: '4',
      title: 'Sprint Planning Notes',
      type: 'folder',
      lastModified: '5 days ago',
      author: 'Team',
      starred: false,
      tags: ['planning', 'sprint'],
      preview: 'Collection of sprint planning sessions and retrospective notes...'
    }
  ];

  const filteredDocs = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-8 h-full overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Documentation Hub
              </h1>
              <p className="text-gray-400 mt-2">
                Collaborative workspace for project documentation and notes
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200">
                <Share size={16} />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-lg hover:from-cyan-500/30 hover:to-pink-500/30 transition-all duration-200">
                <Plus size={16} />
                <span>New Document</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents, notes, and projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black/30 backdrop-blur-xl rounded-lg border border-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Document List */}
            <div className="lg:col-span-1 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h2 className="font-semibold">Recent Documents</h2>
              </div>
              
              <div className="overflow-y-auto max-h-full">
                {filteredDocs.map((doc, index) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc.id)}
                    className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all duration-200 animate-slideUp ${
                      selectedDoc === doc.id ? 'bg-cyan-500/10 border-l-4 border-l-cyan-400' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {doc.type === 'folder' ? (
                          <Folder size={16} className="text-yellow-400" />
                        ) : (
                          <FileText size={16} className="text-cyan-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">{doc.title}</h3>
                          <div className="flex items-center space-x-1 ml-2">
                            {doc.starred && <Star size={12} className="text-yellow-400 fill-current" />}
                            <button className="p-1 hover:bg-white/10 rounded">
                              <MoreHorizontal size={12} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400">{doc.author}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{doc.lastModified}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/10 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Content */}
            <div className="lg:col-span-2 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              {selectedDoc ? (
                <div className="h-full flex flex-col">
                  {/* Document Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {documents.find(d => d.id === selectedDoc)?.title}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                          Last updated {documents.find(d => d.id === selectedDoc)?.lastModified} by{' '}
                          {documents.find(d => d.id === selectedDoc)?.author}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200">
                          <Eye size={16} />
                          <span>Preview</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/30 transition-all duration-200">
                          <Edit3 size={16} />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Document Content */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed">
                        {documents.find(d => d.id === selectedDoc)?.preview}
                      </p>
                      
                      <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        <h4 className="text-cyan-400 font-medium mb-2">AI Summary</h4>
                        <p className="text-sm text-gray-300">
                          This document outlines the key requirements and specifications for the upcoming product release. 
                          Main focus areas include user authentication, payment processing, and performance optimization.
                        </p>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h5 className="font-medium mb-2">Key Stakeholders</h5>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full"></div>
                              <span className="text-sm">Product Manager</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                              <span className="text-sm">Engineering Lead</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white/5 rounded-lg">
                          <h5 className="font-medium mb-2">Next Actions</h5>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Review technical specifications</li>
                            <li>• Schedule stakeholder meeting</li>
                            <li>• Update timeline estimates</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                      Select a document to view
                    </h3>
                    <p className="text-gray-400">
                      Choose from your recent documents or create a new one
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;