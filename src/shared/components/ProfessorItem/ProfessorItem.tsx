import CheckIcon from '@mui/icons-material/Check';

type Props ={
  name: string,
  key: string,
  isValidated: boolean
}
export const ProfessorItem = ({name, key, isValidated}: Props) => {

  return (    
    <div key={key}>{name}      
      {isValidated && <CheckIcon />}
    </div>
    
  );
};

