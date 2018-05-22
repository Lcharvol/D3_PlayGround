import React from 'react';
import * as d3 from 'd3';
import { map } from 'ramda';
import { compose, withStateHandlers, lifecycle } from 'recompose';

import { simplePoints } from '../../data/simplePoints';

const getData = () => {
    let initialData = simplePoints;
    map(d => {
        d.date = d3.format(".1f").parse;
    },initialData);
    return initialData;
};

const SimpleGraph = ({ width, height })=> {

    const  margin = {top: 5, right: 50, bottom: 20, left: 50};
    const w = width - (margin.left + margin.right);
    const h = height - (margin.top + margin.bottom);
    const transform = 'translate(' + margin.left + ',' + margin.top + ')';
    const line = () => d3.select("svg").append("line");
    return (
        <div>
            <svg width={width} height={height}>
                <g transform={transform}>
                    <path className="line" d={line(getData())} strokeLinecap="round"/>}
                </g>
            </svg>
        </div>
    );
};


const enhance = compose(
    withStateHandlers(
      {
        width: 800,
        height:300,
      },
      {
        handleChangeWidth: () => newWidth => ({ width: newWidth }),
      },
    ),
    lifecycle({
        componentDidMount() {
        
        },
      }),
  );
  
  export default enhance(SimpleGraph);