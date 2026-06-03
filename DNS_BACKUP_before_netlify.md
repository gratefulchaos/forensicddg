# DNS records for forensicddg.com — backup before switching to Netlify DNS
# Captured 2026-06-03 from GoDaddy nameservers (ns65/ns66.domaincontrol.com)

## EMAIL — MX (CRITICAL: recreate in Netlify or email breaks)
MX   @   priority 0    smtp.secureserver.net
MX   @   priority 10   mailstore1.secureserver.net

## EMAIL — supporting records
TXT    @                          v=spf1 include:secureserver.net -all
TXT    _dmarc                     v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;
CNAME  email                      email.secureserver.net
CNAME  secureserver1._domainkey   s1.dkim.forensicddg_com.9e0.onsecureserver.net
CNAME  secureserver2._domainkey   s2.dkim.forensicddg_com.9e0.onsecureserver.net

## WEBSITE (Netlify creates these automatically when you enable Netlify DNS)
A      @     75.2.60.5
CNAME  www   forensicddg.netlify.app

## Skippable GoDaddy conveniences (not needed on Netlify)
# CNAME pay              paylinks.commerce.godaddy.com
# CNAME _domainconnect   _domainconnect.gd.domaincontrol.com

## GoDaddy nameservers (current, before change):
# ns65.domaincontrol.com
# ns66.domaincontrol.com
