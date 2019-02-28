import React, { Component } from 'react'
import './RiksdagsModal.scss'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {Figure, Jumbotron, ListGroup} from 'react-bootstrap'
import _ from 'lodash'

import { push } from 'connected-react-router'
import { connect } from 'react-redux'


const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);


const modalStyle={
  display:'flex',
  flexDirection:'row'
}

class RiksdagsModal extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.toggled()
  };
  handleGoToProfile = () => {
    this.props.push('/ledamoter/' + this.props.modalPerson.intressent_id)
  }

  render() {
    const { modalPerson } = this.props;
    return (
      
      <div>
        {!_.isEmpty(modalPerson) &&
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          
          <DialogContent>
            <div style={modalStyle}>
            
              <Figure>
              <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src={modalPerson.bild_url_192}
                />
              </Figure>

              <div>
                <ListGroup>
                  <ListGroup.Item> {modalPerson.tilltalsnamn + " " +  modalPerson.efternamn}</ListGroup.Item>
                  <ListGroup.Item> Parti: {modalPerson.parti}</ListGroup.Item>
                  <ListGroup.Item> Plats i riksdagen {modalPerson.seat.slice(1)}</ListGroup.Item>        
              </ListGroup>
              </div>
              
            </div>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleGoToProfile} color="primary">
              Go to profile
            </Button>
          </DialogActions>
        </Dialog>}
      </div>
    );
  }
}

export default connect(null, { push })(RiksdagsModal)
