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
import { IconType } from 'react-icons/lib/cjs';
import { IAttraction } from './attraction/state';

interface ICardProps extends RouteComponentProps{
  value: string | undefined
  attractionOnClick:()=>void
  isClick: boolean
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

export function MediaCard(props:ICardProps){
  const classes = useStyles();
  
  
  const onAttractionClick = ()=>{
    props.attractionOnClick();
  }

  return (
    <Card className={classes.root}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image="https://timable.com/res/pic/5ee17a7fe3bf4ecf52d46f9e6ce9d5813.jpg"
          title={props.attraction.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            "Tai Kwun"
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Located in the heart of Central on Hong Kong Island, Tai Kwun's site is bordered on three sides by Old Bailey Street, Hollywood Road and Arbuthnot Road, while Chancery Lane runs along the southern (upper) prison wall.
            Tai Kwun is situated in a vibrant and bustling part of the city, with easy access to other important heritage sites. Nestled between the skyscrapers of Central and Mid-Levels, Tai Kwun looks onto Hollywood Road, a busy street dotted with galleries, antique shops, restaurants and bars. The Central-Mid-Levels Escalator is connected to the compound by a new footbridge constructed at the intersection of Hollywood Road and Old Bailey Street in order to provide easier and more convenient access to the site.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-btn">
        <Button size="small" color="primary" onClick={onAttractionClick}>
            {props.value}
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(MediaCard);