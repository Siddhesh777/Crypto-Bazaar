import React from "react";
import {Card,CardContent,CardMedia,Typography,Grid} from "@mui/material";
import "../../App.css";
import CountUp from "react-countup";

export default function Coincard(coin) {

  return (
      <Grid item component={Card} spacing={3} className="card">
        <CardMedia
          component="img"
          height="140"
          image={coin.image}
          alt="green iguana"
          className="coinImage"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {coin.name} ({coin.symbol.toUpperCase()})
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Price : ₹ {coin.current_price}
            {coin.price_change_percentage_24h < 0 ? (
              <span className="red">
                (⬇{coin.price_change_percentage_24h.toFixed(2)})%
              </span>
            ) : (
              <span className="green">
                (⬆{coin.price_change_percentage_24h.toFixed(2)}%)
              </span>
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="data">
            Volume :
            <CountUp
              start={0}
              end={coin.total_volume}
              duration={2}
              separator=","
            />
          </Typography>
          <Typography variant="body1" color="text.secondary" className="data">
            Market Cap :
            <CountUp
              start={0}
              end={coin.market_cap}
              duration={2}
              separator=","
            />
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Grid>
  );
}
