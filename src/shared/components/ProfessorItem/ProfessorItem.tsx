import CheckIcon from '@mui/icons-material/Check';
export const ProfessorItem = (props: any) => {

  return (
    <>
      <div>{props.name}      
        <CheckIcon />
      </div>
    </>
  );
};

