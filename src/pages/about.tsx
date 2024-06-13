import React from 'react';
import { Box, Container, Typography, Paper, Grid, Divider, colors } from '@mui/material';
import styles from '@/styles/aboutStyles';
import theme from '@/styles/theme';
import { GetStaticProps } from 'next';

const About = () => {
  return (
    <Box sx={styles.aboutPageContainer}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={styles.aboutTitle}>
          About Game Vault
        </Typography>
        <Divider sx={styles.divider} />
        
        <Paper sx={styles.aboutPaper}>
          <Typography variant="h4" sx={styles.sectionTitle}>
            Our Story
          </Typography>
          <Typography variant="body1" sx={styles.sectionText}>
            Game Vault was born out of a passion for gaming and a desire to create a comprehensive platform that caters to all gamers. Our journey began with a simple idea: to build a community where gamers can track, manage, and discover new games effortlessly. Today, Game Vault is a thriving community that continues to grow and evolve.
          </Typography>
        </Paper>
        
        <Paper sx={styles.aboutPaper}>
          <Typography variant="h4" sx={styles.sectionTitle}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={styles.sectionText}>
            At Game Vault, we are committed to providing a seamless and engaging experience for all gamers. Our mission is to empower gamers by offering tools and resources that enhance their gaming journey. From tracking game progress to discovering new titles, Game Vault is your ultimate gaming companion.
          </Typography>
        </Paper>
        
        <Paper sx={styles.aboutPaper}>
          <Typography variant="h4" sx={styles.sectionTitle}>
            Our Values
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={styles.valueTitle}>Community</Typography>
              <Typography variant="body1" sx={styles.sectionText}>
                We believe in the power of community and strive to create a welcoming environment where gamers can connect and share their experiences.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={styles.valueTitle}>Innovation</Typography>
              <Typography variant="body1" sx={styles.sectionText}>
                Innovation is at the heart of everything we do. We continuously seek new ways to improve our platform and deliver exceptional value to our users.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={styles.valueTitle}>Passion</Typography>
              <Typography variant="body1" sx={styles.sectionText}>
                Our team is driven by a passion for gaming. We are dedicated to creating the best possible experience for our community.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        <Paper sx={styles.aboutPaper}>
          <Typography variant="h4" sx={styles.sectionTitle}>
            Our Team
          </Typography>
          <Typography variant="body1" sx={styles.sectionText}>
            Our team is composed of talented individuals who share a common love for gaming. From developers to designers, we work together to bring Game Vault to life. Meet the people behind the platform who make it all possible.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={styles.teamTitle}>Guy Guzman</Typography>
              <Typography variant="body1" sx={styles.sectionText}>
                Founder & CEO
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={styles.teamTitle}>Guy Guzman</Typography>
              <Typography variant="body1" sx={styles.sectionText}>
                Lead Developer
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={styles.teamTitle}>Qlean</Typography>
              <Typography variant="body1" sx={styles.sectionText}>
                Community Manager
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        <Paper sx={styles.aboutPaper}>
          <Typography variant="h4" sx={styles.sectionTitle}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={styles.sectionText}>
            We love hearing from our users! If you have any questions, suggestions, or feedback, please dont hesitate to reach out to us at <a href="mailto:guyguz3@gmail.com" style={styles.contactLink}>qleantest@gmail.com</a>. Your input helps us improve and grow Game Vault.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
      props: {}, 
    };
  };

export default About;
