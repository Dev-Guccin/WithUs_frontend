import React from 'react';
import clsx from  'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';




const useStyles = makeStyles((theme) => ({
    searchBar:{
        width: 500,
        padding: '15px 10px',
        fontSize: '15px',
        fontWeight: 600,
        borderRadius: '0.2rem'
    },
    searchResults: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        border: 'none',
        width: 800,
        maxHeight: 400,
        padding: '10px',
        overflowY: 'scroll',
        marginTop: '5px',
        borderRadius: '0.2rem'
    },
    SearchPreview: {
        transition: 1,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 3px',
        paddingRight: '10px',
        bborderTop: '1px solid',
        alignItems: 'baseline'       
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        mragin:0,
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    searchRoot:{
        display:'flex',
        flexDirection: 'column',
        width: '80%',
        alignItems: 'center',
        zIndex: 1
    },
    cancelButton:{
        border: 'none',
        outline: 'none',
        fontWeight: 500,
        zIndex: 1,
        transform: 'translate(225px, 36px)'
    },
    active: {
        opacity: 1
      },
    inactive:{
        opacity: 0
    }
  }));

export default function SearchBar({ keyword, results, code, updateField }){

    const classes = useStyles();


    const SearchPreview = ({CB_code, CB_title, CB_field, CB_organization, CB_photo,CB_startDate, CB_finalDate, index, updateText }) => {
        return (
          <div
            onClick={() => updateText(CB_title,CB_code, false)}
            className={classes.SearchPreview}
          >     
            <TableContainer component={Paper}>
                <Table>
                <TableBody>
                    <TableRow>
                    <TableCell rowSpan={3} width="5%">
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={CB_photo} />
                    </ButtonBase>
                    </TableCell>
                    <TableCell ><ButtonBase><h3>{CB_title}</h3></ButtonBase></TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>
                        주최주관 : {CB_organization} <br/>
                        지원기간 : {CB_startDate} ~ {CB_finalDate} <br/>
                        활동분야 : {CB_field}<br/>
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
          </div>
        );
      };

    const renderResults = results.map(({CB_code, CB_title, CB_field,CB_organization, CB_photo, CB_startDate,CB_finalDate}, index) => {
        return (
          <SearchPreview
            key={index}
            updateText={updateField}
            CB_title={CB_title}
            CB_field={CB_field}
            CB_photo={CB_photo}
            CB_organization={CB_organization}
            CB_startDate={CB_startDate}
            CB_finalDate={CB_finalDate}
            CB_code = {CB_code}
          />
        );
      });
    
    const cancelSearch = () => {
        updateField("", -1, false);
    }

    return(
        <div className={classes.searchRoot}>
            <button
                onClick={() => cancelSearch()}
                className={clsx(classes.cancelButton,(keyword.length > 0 ? classes.active: classes.inactive))}
            >
                <ClearRoundedIcon fontSize="small" />
            </button>
            <input
            className={classes.searchBar}
            placeholder="공모전 검색"
            value={keyword}
            onChange={e => updateField(e.target.value, -1)}
            />

            {results.length > 0 ? (
                <div className={classes.searchResults}>{renderResults}</div>
            ) : null}
          
        </div>
    )
}