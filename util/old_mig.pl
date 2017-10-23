#!/usr/bin/perl

use DBI;

my $dsn = "dbi:mysql:dbname=compm001_cmdata_live;host=10.1.1.5";
my $username = "root";
my $password = "abcdefg";
my %attr =
{
  AutoCommit=>1,
  RaiseError=>1,
  PrintError=>0
};

my $dbh = DBI->connect($dsn, $username, $password, \%attr);
#my $dbh = DBI->connect(
#  'dbi:mysql:dbname=compm001_cmdata_live;host=10.1.1.5',
#  'root',
#  'abcdefg',
#  {AutoCommit=>1,RaiseError=>1,PrintError=>0}
#);

print "2+2=",$dbh->selectrow_array("SELECT 2+2"),"\n";

