import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./styles.css";

export default function SpanningTable({ portfolio, data }) {
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function getRowPrice(qty, current_price) {
    return qty * current_price;
  }
  function getCurrentPrice(id) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return data[i].current_price;
      }
    }
    return 0;
  }
  function getImage(id) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return data[i].image;
      }
    }
    return 0;
  }
  function getTotalValuation() {
    var total = 0;
    for (let i = 0; i < portfolio.length; i++) {
      total += getRowPrice(
        portfolio[i].coin_quantity,
        getCurrentPrice(portfolio[i].coin_id)
      );
    }
    return total;
  }

  return (
    <div className="portTable">
      <TableContainer component={Paper} sx={{ maxWidth: 1000, minWidth: 200 }}>
        <Table aria-label="spanning table">
          <TableHead style={{ backgroundColor:"rgb(255, 145, 0)"}}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio.map((row) => (
              <TableRow key={row.desc}>
              <TableCell component="th" scope="row"  >
  <div>
    <img src={getImage(row.coin_id)} style={{height:"2rem",width:"2rem"}}/>
   </div>
 </TableCell>
                <TableCell>{row.coin_id}</TableCell>
                <TableCell align="right">{row.coin_quantity}</TableCell>
                <TableCell align="right">
                  {getCurrentPrice(row.coin_id)}
                </TableCell>
                <TableCell align="right">
                  {ccyFormat(
                    getRowPrice(row.coin_quantity, getCurrentPrice(row.coin_id))
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={3}>Total Valuation</TableCell>
              <TableCell align="right">
                {ccyFormat(getTotalValuation())}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
