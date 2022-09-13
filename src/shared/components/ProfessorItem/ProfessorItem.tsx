import CheckIcon from '@mui/icons-material/Check';

type Props ={
  name: string,
  key: string,
}
export const ProfessorItem = ({name, key}: Props) => {

  return (    
    <div key={key}>{name}      
      <CheckIcon />
    </div>
    
  );
};

