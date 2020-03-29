import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './AttractionCard.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IAttraction } from './attraction/state';

interface IAttractionCardProps extends RouteComponentProps{
  value: string | undefined
  attractionOnClick:()=>void
  attraction:IAttraction
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export function AttractionCard(props:IAttractionCardProps){
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image={props.attraction.attraction_image}
          title={props.attraction.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {props.attraction.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
           {props.attraction.id}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.attraction.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-btn">
        <Button size="small" color="primary" onClick={()=>props.attractionOnClick()}>
            {props.value}
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(AttractionCard);