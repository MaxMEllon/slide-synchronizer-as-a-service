// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Background = styled.div`
  background-image: url("${process.env.SERVER_LOC}/assets/top.jpg");
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  z-index: -1;
  will-change: opacity;
  transform: scale(1.4);
`

const Filter = styled.div`
  position: relative;
  height: calc(100vh - 3.3rem);
  z-index: 100;
  background: rgb(255, 255, 255, 0.6);
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 40%);
  text-align: center;
  top: 40%;
`

const Section = styled.div`
  height: 300px;
  width: 100vw;
  background-color: gray;
  z-index: 100;
`

const Slogan = styled.p`
  font-size: 2em;
  opacity: 0.5;
`

const ButtonGroup = styled.div``

export default () => (
  <Background>
    <Filter>
      <Content>
        <Slogan>「参加者」と一緒に楽しむLTを</Slogan>
        <ButtonGroup
          className="field is-grouped"
          style={{
            fontSize: '1.5em',
            marginTop: '30px',
            justifyContent: 'center',
          }}>
          <p className="control">
            <Link className="button is-link" to="/users/sign_up">
              登録してスライドを投稿する
            </Link>
          </p>
          <p className="control">
            <Link className="button" to="/users/sign_in">
              ログイン
            </Link>
          </p>
        </ButtonGroup>
      </Content>
    </Filter>
    <Section />
  </Background>
)
