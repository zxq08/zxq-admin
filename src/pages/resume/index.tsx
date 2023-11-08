import * as React from 'react'
import { useState, useEffect } from 'react'
import Icon from '../components/icon'
import styles from './style.module.less'
import { Row, Col, Divider } from 'antd'
import {
  companyData,
  companyDataType,
  educationData,
  educationDataType,
  projectData,
  projectDataType,
  skillData
} from './data'

const iconStyles = {
  fontSize: 20,
  color: '#1890ff',
  marginRight: 8
}

function Resume() {
  return (
    <div className={styles.wrap}>
      <div className={styles.headBg}>
        <div className={styles.headTitle}>个人简历</div>
        <div className={styles.imgWrap} style={{ display: 'none' }}>
          <img
            // src="https://thirdwx.qlogo.cn/mmopen/vi_32/FPHFDD1vQFM7aiajzPyDhia1ArEGL3euMyURIOQlMxKrJn1eicicw56wEn7rYppwY3KZia32UPiadLstC44VNsyK4BtQ/132"
            // src="/image/QRcode.png"
            src="/image/wx.jpg"
            alt="头像"
          />
        </div>
      </div>
      <div className={styles.infoWrap}>
        {/* <div className={styles.infoTitle}>
          <span>朱兴庆</span>
          <span>前端工程师</span>
        </div> */}
        <Row gutter={[12, 12]}>
          <Col span={8}>
            <div className={styles.infoContent}>
              <Icon style={iconStyles} type="icon-xingbie"></Icon>
              <span>姓名：</span>
              <span>朱兴庆</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.infoContent}>
              <Icon style={iconStyles} type="icon-xingbie"></Icon>
              <span>岗位：</span>
              <span>前端工程师</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.infoContent}>
              <Icon style={iconStyles} type="icon-xingbie"></Icon>
              <span>性别：</span>
              <span>男</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.infoContent}>
              <Icon style={iconStyles} type="icon-shouji"></Icon>
              <span>手机：</span>
              <span>13701141845</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.infoContent}>
              <Icon style={iconStyles} type="icon-shijian"></Icon>
              <span>工龄：</span>
              <span>6年</span>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.infoContent}>
              <Icon style={iconStyles} type="icon-youxiang"></Icon>
              <span>邮箱：</span>
              <span>461890276@qq.com</span>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.content}>
        <div className={styles.contentHead}>
          <div className={styles.contengHeadIcon}>
            <div className={styles.contengHeadIconBg}>
              <Icon
                type="icon-jishu"
                style={{ fontSize: 20, color: '#fff', margin: 0 }}
              />
            </div>
          </div>
          <Divider
            orientation="left"
            plain
            dashed
            style={{ borderColor: '#1890ff', margin: '0 0 0 20px' }}
          >
            <span className={styles.contentTitle}>专业技能</span>
          </Divider>
        </div>
        <div className={styles.contentLeft}>
          <Divider
            plain
            type="vertical"
            style={{ borderColor: '#1890ff', height: 'auto', margin: '0 17px' }}
          ></Divider>
          <div className={styles.companyWrap}>
            <ul className={styles.styleUl}>
              {skillData.map((skill: string, idx) => {
                return (
                  <li key={idx} style={{ lineHeight: '24px' }}>
                    <Row justify="space-around">
                      <Col span={24}>{skill}</Col>
                    </Row>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentHead}>
          <div className={styles.contengHeadIcon}>
            <div className={styles.contengHeadIconBg}>
              <Icon
                type="icon-gongzuo"
                style={{ fontSize: 20, color: '#fff', margin: 0 }}
              />
            </div>
          </div>
          <Divider
            orientation="left"
            plain
            dashed
            style={{ borderColor: '#1890ff', margin: '0 0 0 20px' }}
          >
            <span className={styles.contentTitle}>工作经历</span>
          </Divider>
        </div>
        <div className={styles.contentLeft}>
          <Divider
            plain
            type="vertical"
            style={{ borderColor: '#1890ff', height: 'auto', margin: '0 17px' }}
          ></Divider>
          <div className={styles.companyWrap}>
            {companyData.map((company: companyDataType, idx) => {
              return (
                <div className={styles.companyData} key={idx}>
                  <Row justify="space-around">
                    <Col span={12} style={{ fontWeight: 500 }}>
                      {company.name}
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      {company.date}
                    </Col>
                    {/* <Col span={8}>{company.position}</Col> */}
                  </Row>
                  <p style={{ marginTop: 10, fontWeight: 500 }}>主要职责：</p>
                  <ul className={styles.styleUl}>
                    {Array.isArray(company.duty) ? (
                      company.duty.map((it: string, inx) => (
                        <li key={inx}>
                          <p>{it}</p>
                        </li>
                      ))
                    ) : (
                      <li key={0}>
                        <p>{company.duty}</p>
                      </li>
                    )}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentHead}>
          <div className={styles.contengHeadIcon}>
            <div className={styles.contengHeadIconBg}>
              <Icon
                type="icon-xiangmu"
                style={{ fontSize: 20, color: '#fff', margin: 0 }}
              />
            </div>
          </div>
          <Divider
            orientation="left"
            plain
            dashed
            style={{ borderColor: '#1890ff', margin: '0 0 0 20px' }}
          >
            <span className={styles.contentTitle}>项目经历</span>
          </Divider>
        </div>
        <div className={styles.contentLeft}>
          <Divider
            plain
            type="vertical"
            style={{ borderColor: '#1890ff', height: 'auto', margin: '0 17px' }}
          ></Divider>
          <div className={styles.companyWrap}>
            {projectData.map((project: projectDataType, idx) => {
              return (
                <div className={styles.companyData} key={idx}>
                  <Row gutter={[0, 8]}>
                    <Col
                      span={24}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ fontWeight: 500, fontSize: 16 }}>
                        {project.name}
                      </span>
                      <span>{project.date}</span>
                    </Col>
                    <Col span={24}>
                      <span style={{}}>项目描述：</span>
                      {project.desc}
                    </Col>
                    <Col span={24}>
                      <span style={{}}>技术栈：</span>
                      {project.technologyStack}
                    </Col>
                  </Row>
                  <p style={{ marginTop: 8 }}>核心功能：</p>
                  <ul className={styles.styleUl}>
                    {Array.isArray(project.business) ? (
                      project.business.map((it: string, inx) => (
                        <li key={inx}>
                          <p>{it}</p>
                        </li>
                      ))
                    ) : (
                      <p>{project.business}</p>
                    )}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contentHead}>
          <div className={styles.contengHeadIcon}>
            <div className={styles.contengHeadIconBg}>
              <Icon
                type="icon-xuexiao"
                style={{ fontSize: 20, color: '#fff', margin: 0 }}
              />
            </div>
          </div>
          <Divider
            orientation="left"
            plain
            dashed
            style={{ borderColor: '#1890ff', margin: '0 0 0 20px' }}
          >
            <span className={styles.contentTitle}>教育经历</span>
          </Divider>
        </div>
        <div className={styles.contentLeft}>
          <Divider
            plain
            type="vertical"
            style={{ borderColor: '#1890ff', height: 'auto', margin: '0 17px' }}
          ></Divider>
          <div className={styles.companyWrap}>
            {educationData.map((educate: educationDataType, idx) => {
              return (
                <Row justify="space-around" key={idx}>
                  <Col span={8}>{educate.date}</Col>
                  <Col span={8}>{educate.name}</Col>
                  <Col span={8}>{educate.major}</Col>
                </Row>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume
