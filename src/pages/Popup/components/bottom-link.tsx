import { Center, createStyles } from '@mantine/core';
import React, { AnchorHTMLAttributes } from 'react';

const useStyles = createStyles((theme) => ({
  Link: {
    marginTop: 15,
    color: theme.colors.blue[6],
    textDecoration: 'underline',
  },
}));

export function BottomLink(
  props: React.PropsWithChildren<
    React.DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  >
) {
  const styles = useStyles();

  return (
    <>
      <Center>
        <a {...props} className={styles.classes.Link} href={'#'}>
          {props.children}
        </a>
      </Center>
    </>
  );
}
