export const FooterLinkConfig = {
  FooterLinks: [
    {linkName: 'Sitemap', href: '#'},
    {linkName: 'Privacy', href: '#'},
    {linkName: 'Terms', href: '/termsAndconditions'},
    {linkName: 'Help', href: '/helppage'},
  ],
};

export interface FooterLinkConfigObject {
  linkName?: string;
  href?: string;
}
