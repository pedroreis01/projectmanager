import CardContent from '../../components/CardContent';
import ProjectList from '../../components/ProjectList';

const MyProjects: React.FC = () => {
  return (
    <CardContent fullWidth>
      <ProjectList linkedUser={true} />
    </CardContent>
  );
};

export default MyProjects;
