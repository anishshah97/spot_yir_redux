import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
      maxWidth: 345
  },
  cardButton: {
    display: "block",
    textAlign: "initial"
  },
  media: {
      height: 200
  }
};

function SimpleMediaCard(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <ButtonBase className={classes.cardButton}>
          <CardMedia
            className={classes.media}
            image="https://material-ui-next.com/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="headline" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </ButtonBase>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleMediaCard);
