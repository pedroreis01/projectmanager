import CardContent from '../../components/CardContent';
import ProjectList from '../../components/ProjectList';

const NewProjects: React.FC = () => {
  return (
    <CardContent fullWidth>
      <ProjectList linkedUser={false} />
    </CardContent>
  );
};

export default NewProjects;
