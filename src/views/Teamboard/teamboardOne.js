import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Editor from './teamboardEditor';





const categories = [
  {
    value: 1,
    label: '사진/영상/UCC',
  },
  {
    value: 2,
    label: '콘텐츠/웹툰',
  },
  {
    value: 3,
    label: '아이디어/기획',
  },
  {
    value: 4,
    label: '취업/창업',
  },
  {
    value: 5,
    label: '디자인/미술',
  },
  {
    value: 6,
    label: '과학/공학/IT',
  },
  {
    value: 7,
    label: '음악/예술',
  },
  {
    value: 8,
    label: '금융/경제/경영',
  },
  {
    value: 9,
    label: '환경/에너지',
  },
  {
    value: 10,
    label: '취업/창업',
  },
  {
    value: 11,
    label: '문화/영화/문학',
  },
  {
    value: 12,
    label: '연구/학술/논문',
  },
];




export default function AddressForm() {

  const [category, setCategory] = React.useState(1);
  const [value, setValue] = React.useState('contest');
  const [desc, setDesc] = React.useState('');

  const radioHandleChange = (e) => {
    setValue(e.target.value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  function onEditorChange(value) {
      setDesc(value)
  }


  return (
    <React.Fragment>
    <FormControl component="fieldset">
      <FormLabel component="legend">팀원 모집 분류</FormLabel>
      <RadioGroup aria-label="contestOrProject" name="contestOrProject" value={value} onChange={radioHandleChange}>
        <FormControlLabel value="contest" control={<Radio />} label="공모전" />
        <FormControlLabel value="project" control={<Radio />} label="프로젝트" />
      </RadioGroup>
    </FormControl>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            id="CB_title"
            name="CB_title"
            label="제목"
            placeholder="위더스 팀원 모집합니다"   
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="recruitNumber"
            name="recruitNumber"
            label="모집인원"
            type="number"
            variant="outlined"  
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            select
            id="CT_code"
            name="CT_code"
            label="카테고리"
            value={category}
            onChange={handleChange}
          >
            {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="CT_finalDate"
            name="CT_finalDate"
            label="마감 날짜"
            fullWidth
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Editor value={desc} onChange={onEditorChange} />
        </Grid>
      </Grid>
      <Button
                    variant="contained"
                    color="grey[500]"
                    onClick={handleNext}
                    className={classes.button}
                  ></Button>
    </React.Fragment>
  );
}
