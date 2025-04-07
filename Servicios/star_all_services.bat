@echo off

SETLOCAL ENABLEDELAYEDEXPANSION
REM 
SET folders="admin_api" "citas_api" "mascotas_api" "usuario_api"

REM
SET "root_dir=%cd%"

FOR %%F IN (%folders%) DO (
    ECHO =================================================================
    ECHO Starting %%F
    CD /D "%root_dir%\%%F"

    ECHO Executing: docker-compose build 
    docker-compose build 

    ECHO Executing: docker-compose up -d
    docker-compose up -d

    ECHO Finished %%F
    ECHO =================================================================
    )
