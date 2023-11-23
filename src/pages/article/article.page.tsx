import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './article.styles.scss';

import { IArticle } from "../../models/article.model";
import { getLocalDayMonthYear } from '../../utils/user-friendly-date.utils';

const ArticlePage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as Omit<IArticle, "source" | "url"> & {
    content?: string;
    source?: string;
  }

  return (
    <Box component="section" className="article">
      <Box className="article-header">
        <IconButton aria-label="back" size="small" onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        <Typography variant="h6" component="h2">
          {state.title}
        </Typography>
      </Box>
      <Box className="article-info info">
        {state.source &&
          <Box className="info-block">
            <Typography className="info-title">
              Source:
            </Typography>
            <Typography className="info-text">
              {state.source}
            </Typography>
          </Box>
        }
        <Box className="info-block">
          <Typography className="info-title" >
            Publication date:
          </Typography>
          <Typography className="info-text">
            {getLocalDayMonthYear(state.publishedAt)}
          </Typography>
        </Box>
      </Box>
      <Box className="article-text">
        <Typography className="article-text__title">
          Description
        </Typography>
        <Typography className="article-text__text">
          {state.description}
        </Typography>
      </Box>
      {state.urlToImage &&
        <Box className="article-image-wrapper">
          <img src={state.urlToImage} alt={state.title} className="article-image" />
        </Box>
      }
      <Box className="article-text">
        <Typography className="article-text__title">
          Content
        </Typography>
        <Typography className="article-text__text">
          {state.content}
        </Typography>
      </Box>
      <Box className="article-info info">
        <Box className="info-block">
          <Typography className="info-title">
            Authors:
          </Typography>
          <Typography className="info-text">
            {state.author}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ArticlePage;