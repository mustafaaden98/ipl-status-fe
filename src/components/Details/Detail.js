import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    selectBox: {
        display: 'flex',
        alignItems: 'center'
    }
}))

export const Details = () => {
    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    const [team1, setTeam1] = useState(undefined);
    const [team2, setTeam2] = useState(undefined);
    const [team1Name, setTeam1Name] = useState('');
    const [team2Name, setTeam2Name] = useState('');
    const [counts, setCounts] = useState({});
    const [matchesDetails, setMatchDetails] = useState([]);
    useEffect(() => {
        _getTeams();
    }, []);

    const _getTeams = async () => {
        const data = await axios({
            method: 'get',
            url: 'http://localhost:5000/teams'
        });
        setTeams(data.data);

    }
    const handleChange1 = (event) => {
        setTeam1(event.target.value);
        let pos = teams.findIndex(team => team.id == event.target.value);
        setTeam1Name(teams[pos].name);
    }
    const handleChange2 = (event) => {
        setTeam2(event.target.value);
        let pos = teams.findIndex(team => team.id == event.target.value);
        setTeam2Name(teams[pos].name);
    }
    const test = () => {
        if (teams.length > 0) {
            return teams.map((item, index) => {
                return <option key={item.id} value={item.id}>{item.name}</option>
            })
        }
        else {
            return []
        }
    }
    const _onClickSubmitButton = async () => {
        const data = await axios({
            method: 'get',
            url: `http://localhost:5000/results?team1=${team1}&team2=${team2}`
        });
        setCounts(data.data)
        const payload = await axios({
            method: 'get',
            url: `http://localhost:5000/matches?team1=${team1}&team2=${team2}`
        });
        setMatchDetails(payload.data);
    }
    const reset = () => {
        setTeam1(undefined);
        setTeam2(undefined);
        setTeam1Name('');
        setTeam2Name('');
        setCounts({})
    }
    return (
        <div>
            Details Component
            {/* Select boxes */}
            <div>
                <div className={classes.selectBox}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Team 1</InputLabel>
                        <Select
                            native
                            value={team1}
                            onChange={handleChange1}
                            inputProps={{
                                name: 'team1',
                                id: 'age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {test()}
                        </Select>
                    </FormControl>
                    <span>V/S</span>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Team 2</InputLabel>
                        <Select
                            native
                            value={team2}
                            onChange={handleChange2}
                            inputProps={{
                                name: 'team2',
                                id: 'age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {test()}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={_onClickSubmitButton} style={{ marginRight: '10px' }}>
                        Submit
                    </Button>
                    <Button variant="contained" color="default" onClick={reset}>
                        Clear
                    </Button>
                </div>
            </div>
            <div>
                <div>
                    Results
                </div>
                <div>
                    <Typography variant="h5" gutterBottom>
                        {`${team1Name} Wins: ${counts.team1 || 'NA'}`}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {`${team2Name} Wins: ${counts.team2 || 'NA'}`}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {`Total matches : ${counts.team1 + counts.team2 || 'NA'}`}
                    </Typography>
                </div>

            </div>
            <div>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Team 1</TableCell>
                                <TableCell>Team 2</TableCell>
                                <TableCell>Winner Team</TableCell>
                                <TableCell>Match Date</TableCell>
                                <TableCell>City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                matchesDetails.length &&
                                matchesDetails.map((item,index) => {
                                    let date = new Date(item.dateOfMatch);
                                    let formatedDate = moment(date).format('L'); 
                                    let team1NameTable = item.team1 == team1 ? team1Name : item.team1 == team2 ? team2Name : '';
                                    let team2NameTable = item.team2 == team2 ? team2Name : item.team2 == team1 ? team1Name : '';
                                    let winnerName = item.winner == team1 ? team1Name : item.winner == team2 ? team2Name : 'Draw'
                                    return <TableRow key={index} >
                                        <TableCell>
                                            {team1NameTable}
                                        </TableCell>
                                        <TableCell >{team2NameTable}</TableCell>
                                        <TableCell >{winnerName}</TableCell>
                                        <TableCell >{formatedDate}</TableCell>
                                        <TableCell >{item.city || 'N/A'}</TableCell>
                                    </TableRow>
                                })
                                // matchesDetails.map((item, index) =>
                                //     <TableRow key={index} >
                                //         <TableCell component="th" scope="row">
                                //             {item.team1}
                                //         </TableCell>
                                //         <TableCell >{item.team2}</TableCell>
                                //         <TableCell >{item.winner}</TableCell>
                                //         <TableCell >{item.dateOfMatch}</TableCell>
                                //         <TableCell >{item.city}</TableCell>
                                //     </TableRow>
                                // )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}