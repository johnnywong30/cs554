import React from "react";
import Stack from "react-bootstrap/Stack";
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import {v4 as uuidv4 } from 'uuid';

import { toPercent } from '../constants/helpers';

const PokemonStats = ({stats}) => {
    const BASE_STAT_CAP = 255;

    const statName = {
        "hp": "HP",
        "attack": "ATK",
        "defense": "DEF",
        "special-attack": "SP. ATK",
        "special-defense": "SP. DEF",
        "speed": "SPD"
    }
    return (
        <Stack direction="vertical" gap={2} className='mx-auto' style={{width:'200px'}}>
            {
                stats.map(({base_stat, name}) => {
                    const renderTooltip = (props) => (
                        <Tooltip id={`${name}-tooltip`} {...props}>
                            {base_stat}
                        </Tooltip>
                    );
                    
                    return (
                        <Stack key={uuidv4()} direction="horizontal" gap={1}>
                            <Badge className='bg-light text-dark' style={{width:'110px'}} >{statName[name]}</Badge>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 100, hide: 200 }}
                                overlay={renderTooltip}
                            >
                                <ProgressBar className='w-100' style={{color: 'black'}} variant={'warning'} now={toPercent(base_stat, BASE_STAT_CAP)} label={base_stat} />
                            </OverlayTrigger>
                        </Stack>
                    )
                })
            }
        </Stack>
    )
} 

export default PokemonStats;