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
import { Divider, Collapse } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

interface IAttractionCardProps extends RouteComponentProps {
  value: string | undefined
  attractionOnClick: () => void
  cardOnClick: () => void
  attraction: IAttraction
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: theme.palette.background.paper,
    // marginBottom:0
  },
  media: {
    height: 140,
  },
  section1: {
    margin: theme.spacing(3),
  },
  addButton: {
    color: "#424242"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardContent:{
    margin:'0 !important',
    paddingBottom:'0 !important',
    paddingTop:'1px !important'
  },
  cardButton:{
    marginTop:'0 !important'
  },
  collapse:{
    margin:'0 !important'
  }
}));

export function AttractionCard(props: IAttractionCardProps) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => props.cardOnClick()}>
        <CardMedia
          className={classes.media}
          image={props.attraction.attraction_image}
          title={props.attraction.name}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.section1}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.attraction.name}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="h2">
              Description
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className="attraction-description">
              {props.attraction.description}
            </Typography>
          </div>
        </CardContent>
        <CardActions className={`${classes.cardButton} card-btn`}>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Button size="small" color="primary" onClick={() => props.attractionOnClick()}>
            {/* {props.value} */}

            <AddIcon className={classes.addButton} />
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.collapse}>
            
            <div>
              <Typography gutterBottom variant="subtitle2" component="h2">
                Phone Number
                </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.attraction.telephone}
              </Typography>
            </div>
            <Divider variant="middle" />
            <div>
              <Typography gutterBottom variant="subtitle2" component="h2">
                Further Information
                </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Link href={props.attraction.url}>
                  {props.attraction.url}
                </Link>
              </Typography>
            </div>
        </Collapse>
      </CardActionArea>

    </Card>
  );
}

export default withRouter(AttractionCard);