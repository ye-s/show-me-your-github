import React from 'react';

const Repo = ({ 
  repoName,
  language,
  description,
  dateCreated
}) => (
  <div className='repoBlock'>
    <p className='repoName'><span>{repoName}</span></p>
    <p className='repoTextData'>Repository created: {dateCreated}. {
      language 
      ? ` Main language - ${language}` 
      : ''}
    </p>
    <p className='repoTextData repoDescription'>{description}</p>
  </div>
);

export default Repo;