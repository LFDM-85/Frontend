import React from 'react';
import { AssessmentsSection } from '../../shared/components/AssessmentsSection/AssessmentsSection';
import { ClassSection } from '../../shared/components/ClassSection/ClassSection';
import { LecturesSection } from '../../shared/components/LecturesSection/LecturesSection';
import { IUser } from '../../shared/interfaces/interfaces';

const ClassesPage = () => {
  return (
    <>
      <ClassSection />
      <LecturesSection />
      <AssessmentsSection />
    </>
  );
};

export default ClassesPage;
