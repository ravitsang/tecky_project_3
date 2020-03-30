import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import './AttractionCard.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IAttraction } from './attraction/state';
import { Divider } from '@material-ui/core';

interface IAttractionCardProps extends RouteComponentProps{
  value: string | undefined
  attractionOnClick:()=>void
  cardOnClick:()=>void
  attraction:IAttraction
}

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: 345,
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 140,
  },
  section1: {
    margin: theme.spacing(3),
  },
}));

export function AttractionCard(props:IAttractionCardProps){
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={()=>props.cardOnClick()}>
        <CardMedia
          className={classes.media}
          image={props.attraction.attraction_image}
          title={props.attraction.name}
        />
        <CardContent>
          <div className={classes.section1}>
            <Typography gutterBottom variant="h5" component="h2">
            {props.attraction.name}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="h2">
            Description
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.attraction.description}
            </Typography>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Typography gutterBottom variant="subtitle2" component="h2">
            Phone Number
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.attraction.telephone}
            </Typography>
          </div>
          <Divider variant="middle" />
          <div className={classes.section1}>
            <Typography gutterBottom variant="subtitle2" component="h2">
            Further Information
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Link href={props.attraction.url}>
                {props.attraction.url}
              </Link>
            </Typography>
          </div>
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