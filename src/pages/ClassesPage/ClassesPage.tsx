import React from 'react';
import { AssessmentsSection } from '../../shared/components/AssessmentsSection/AssessmentsSection';
import { ClassSection } from '../../shared/components/ClassSection/ClassSection';
import { IUser } from '../../shared/interfaces/interfaces';

const ClassesPage = () => {
  return (
    <>
      <ClassSection />
      <AssessmentsSection />
    </>
  );
};

export default ClassesPage;
