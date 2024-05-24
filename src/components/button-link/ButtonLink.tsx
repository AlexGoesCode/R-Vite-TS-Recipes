import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Button, ButtonProps } from 'react-bootstrap';

// Custom component that forwards the ref and ensures type compatibility
const ButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps & ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button {...props} as={Link as any} ref={ref}>
      {children}
    </Button>
  )
);

export default ButtonLink;
