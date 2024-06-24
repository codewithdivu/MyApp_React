import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Stack, Button, Tooltip, IconButton } from '@mui/material';
import Iconify from './Iconify';

// ----------------------------------------------------------------------

SocialsButton.propTypes = {
  initialColor: PropTypes.bool,
  links: PropTypes.objectOf(PropTypes.string),
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function SocialsButton({ initialColor = false, simple = true, links = {}, sx, ...other }) {
  const SOCIALS = [
    {
      name: 'FaceBook',
      icon: 'eva:facebook-fill',
      socialColor: '#1877F2',
      path: links.facebook || 'https://www.facebook.com/profile.php?id=100006345046345',
    },
    {
      name: 'Instagram',
      icon: 'ant-design:instagram-filled',
      socialColor: '#E02D69',
      path: links.instagram || 'https://www.instagram.com/divuu0017/',
    },
    {
      name: 'Linkedin',
      icon: 'eva:linkedin-fill',
      socialColor: '#007EBB',
      path: links.linkedin || 'https://www.linkedin.com/in/divyesh-mavadiya-a8a995201/',
    },
    {
      name: 'Twitter',
      icon: 'eva:twitter-fill',
      socialColor: '#00AAEC',
      path: links.twitter || 'https://x.com/Divyesh_017',
    },
  ];

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {SOCIALS.map((social) => {
        const { name, icon, path, socialColor } = social;
        return simple ? (
          <a key={name} href={path} target="_blank" rel="noopener noreferrer">
            <Tooltip title={name} placement="top">
              <IconButton
                color="inherit"
                sx={{
                  ...(initialColor && {
                    color: socialColor,
                    '&:hover': {
                      bgcolor: alpha(socialColor, 0.08),
                    },
                  }),
                  ...sx,
                }}
                {...other}
              >
                <Iconify icon={icon} sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
          </a>
        ) : (
          <Button
            key={name}
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                '&:hover': {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
