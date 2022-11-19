import { Routes as RoutesDOM, Route, Navigate } from "react-router-dom";
import { Button } from '@mui/material';
import { useDrawerContext } from "../contexts";



export const Routes = () => {

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <RoutesDOM>
      <Route path="/" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle drawer</Button>} />
      <Route path="*" element={<Navigate to="/" />} />
    </RoutesDOM>
  );
};
