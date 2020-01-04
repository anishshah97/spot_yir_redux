import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector } from "react-redux";



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function PlaylistCreator({ name, spotAPI, track_chunks }) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [clicked, setClicked] = React.useState(false)
  const userId = useSelector(state => state.Spotify.me.id);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    const handleButtonClick = async () => {
      if (!loading && !success && clicked) {
        setLoading(true)
        await spotAPI.createPlaylist(userId, {name: name})
            .then(resp => resp.id)
            .then(async id => {
              await track_chunks.forEach(async uris => {
                await spotAPI.addTracksToPlaylist(id, uris)
              });
            })
        setSuccess(true)
        setLoading(false)
      }
    };
    handleButtonClick()
  }, [loading, name, spotAPI, success, userId, clicked, track_chunks]);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          className={buttonClassname}
          onClick={() => setClicked(true)}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          className={buttonClassname}
          disabled={loading}
          onClick={() => setClicked(true)}
        >
          {!success && !loading && ("Save Playlist?")}
          {!success && loading && ("Saving...")}
          {success && !loading && ("Saved")}
        </Button>
      </div>
    </div>
  );
}
