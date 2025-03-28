--
--  Author: Hari Sekhon
--  Date: 2008-04-28 21:36:48 +0100 (Mon, 28 Apr 2008)
--
--  vim:ts=4:sts=4:sw=4:et:filetype=sql
--
--  https://github.com/HariSekhon/SQL-scripts
--
--  License: see accompanying Hari Sekhon LICENSE file
--
--  If you're using my code you're welcome to connect with me on LinkedIn and optionally send me feedback to help steer this or other code I publish
--
--  https://www.linkedin.com/in/HariSekhon
--

-- Oracle Show Checkpoints on DBF data files (relevant for DBA recoveries)
--
-- Tested on Oracle 9i, 10g, 11g, 19c

SELECT
    NAME,
    checkpoint_time
FROM
    v$datafile
ORDER BY
    checkpoint_time;
