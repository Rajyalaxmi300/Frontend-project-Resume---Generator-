import React, { useState } from 'react';
import { Code, Plus, X } from 'lucide-react';

interface SkillsProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export default function Skills({ data, onChange }: SkillsProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'SQL', 'AWS', 'Docker',
    'Git', 'HTML/CSS', 'MongoDB', 'Express.js', 'Vue.js', 'Angular', 'Java', 'C++',
    'Machine Learning', 'Data Analysis', 'Project Management', 'Agile', 'Scrum'
  ];

  const availableSuggestions = suggestedSkills.filter(skill => !data.includes(skill));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-orange-100 p-2 rounded-lg">
          <Code className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Add Skill</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter a skill..."
          />
          <button
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {availableSuggestions.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Suggested Skills</label>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 10).map((skill) => (
              <button
                key={skill}
                onClick={() => onChange([...data, skill])}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Your Skills</label>
        {data.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <div
                key={skill}
                className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg"
              >
                <span className="font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Code className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No skills added yet.</p>
            <p className="text-sm">Add your technical and professional skills.</p>
          </div>
        )}
      </div>
    </div>
  );
}