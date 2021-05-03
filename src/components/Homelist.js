import React, { useEffect } from 'react'; // import 로 useState 를 불러온다!
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Homelist(props) {
  const section = props.section
  useEffect(() => {
    console.log(section);
  }, []);
  return (
    <div className="">
      <Grid container>
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={12}><strong>{section.CB_title}
            </strong></Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                분야: {section.CB_field}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>{section.CB_organization}</Grid>
        <Grid item xs={2}>{section.CB_finalDate}</Grid>
        <Grid item xs={1}>조회수</Grid>
      </Grid>
    </div>
  );
}