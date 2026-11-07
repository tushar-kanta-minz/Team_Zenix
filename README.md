# Team_Zenix - Multi-agent AI software development team using Switch and Discord

## Overview

Team_Zenix is a multi-agent AI software development project built using Switch and Discord. It explores how specialized AI agents can collaborate to investigate bugs, propose fixes, review code, and test solutions under human supervision.

## Problem Statement

Software debugging often involves multiple activities, including identifying the root cause, implementing a fix, testing edge cases, and reviewing the final solution. Managing these tasks individually can be time-consuming.

## Our Solution

Team_Zenix organizes these activities into a collaborative AI-assisted workflow.

### Agent Responsibilities

- **Developer Agent:** Investigates bugs and proposes code changes.
- **Tester Agent:** Creates test cases and checks expected behavior.
- **Reviewer Agent:** Evaluates code quality and identifies potential issues.
- **Human Supervisor:** Reviews and approves proposed changes.

## Technology Stack

- Switch — AI agent coordination
- Discord — Shared agent communication
- GitHub — Version control and collaboration
- JavaScript — Sample debugging demonstration

## Example Problem

The demonstration project contains a JavaScript function that calculates the average of an array of numbers.

The original implementation contains an off-by-one error in its loop condition.

The intended collaborative workflow is:

1. Identify the bug.
2. Explain its root cause.
3. Propose a corrected implementation.
4. Test normal and edge-case inputs.
5. Review the solution.
6. Obtain human approval before merging changes.

## Repository Structure

- `agents/` — Agent responsibilities and instructions
- `docs/` — Architecture and workflow documentation
- `sample-project/` — Buggy code, corrected code, and tests

## Project Goal

Demonstrate how a coordinated team of AI agents can assist with software development while keeping important decisions under human control.

## Status

Repository preparation and demonstration development in progress.
