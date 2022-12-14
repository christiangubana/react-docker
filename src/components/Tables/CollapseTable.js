import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';

function CollapsibleTable({ rows, open }) {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box className='m-1'>
        <Table size='medium'>
          <TableHead></TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  );
}

export default CollapsibleTable;
