import { AssessmentsSection } from '../../shared/components/AssessmentsSection/AssessmentsSection';
import { ClassSection } from '../../shared/components/ClassSection/ClassSection';
import { LecturesSection } from '../../shared/components/LecturesSection/LecturesSection';
import { WorkSection } from '../../shared/components/WorkSection/WorkSection';

const ClassesPage = () => {
  return (
    <>
      <ClassSection />
      <LecturesSection />
      <WorkSection />
      <AssessmentsSection />
    </>
  );
};

export default ClassesPage;
