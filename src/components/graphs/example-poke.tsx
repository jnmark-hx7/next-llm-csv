'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'HP', Girafarig: 70, ShayminSkyForme: 100, Jirachi: 100, ShayminLandForme: 100 },
  { name: 'Attack', Girafarig: 80, ShayminSkyForme: 103, Jirachi: 100, ShayminLandForme: 100 },     
  { name: 'Defense', Girafarig: 65, ShayminSkyForme: 75, Jirachi: 100, ShayminLandForme: 100 },     
  { name: 'Sp. Atk', Girafarig: 90, ShayminSkyForme: 120, Jirachi: 100, ShayminLandForme: 100 },    
  { name: 'Sp. Def', Girafarig: 65, ShayminSkyForme: 75, Jirachi: 100, ShayminLandForme: 100 },     
  { name: 'Speed', Girafarig: 85, ShayminSkyForme: 127, Jirachi: 100, ShayminLandForme: 100 },      
];

const PokemonStatsChart = () => (
  <BarChart width={600} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="Girafarig" fill="#8884d8" />
    <Bar dataKey="ShayminSkyForme" fill="#82ca9d" />
    <Bar dataKey="Jirachi" fill="#ffc658" />
    <Bar dataKey="ShayminLandForme" fill="#FF4500" />
  </BarChart>
);

export default PokemonStatsChart;