import CardContent from "../../components/CardContent";
import TaskList from "../../components/TaskList";


const MyTasks: React.FC = () => {
  return (
    <CardContent fullWidth>
      <TaskList justList={false}/>
    </CardContent>
  );
};

export default MyTasks;
