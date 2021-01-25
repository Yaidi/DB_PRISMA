#!groovy
@Library('PSL@LKG') _

if (env.CHANGE_ID == null && env.BRANCH_NAME != 'master') {
  return
}

node('aws-centos') {
  def common = get_common_functions('common', '5.2.1')
  def common_ci = new ors.ci.CommonCi(steps, env, docker)
  def common_cd = new ors.cloudos.CommonCd(steps, env, docker, Artifactory)

  currentDir = sh(script: 'pwd', returnStdout: true).trim()
  common.emailList = 'jhoanegar@gmail.com'
  common.emailTemplatePath = "${currentDir}/CI/Jenkins/template.html"

  stage ('Checkout code') {
    def common_scm = new ors.utils.common_scm(steps, env)

    checkout scm
    common_scm.update_submodules()

    sh 'git rev-parse --short HEAD > REVISIONS'
    sh 'git rev-parse --short HEAD:report-templates >> REVISIONS'
  }

  stage ('Build CI test image') {
    sh 'docker-compose build ci'
  }

  parallel(
    'Lint & Test': {
      try {
        withCredentials([string(credentialsId: 'SOME_ENV_VAR', variable: 'SOME_ENV_VAR')]) {
          sh 'docker-compose run --rm ci'
        }
      } finally {
        sh 'docker-compose down --rmi all'
      }
    },

    'Harmony Scan': {
      if (env.BRANCH_NAME != 'master') {
        echo 'Not the master branch, skipping...'
      } else {
        def scansDir = "${env.WORKSPACE}/build-${env.BUILD_NUMBER}-SecurityScans";

        dir (scansDir) {
          def scan = new ors.security.common_harmony(steps, env, Artifactory, scm)
          def image_name = 'dockerhub.com/images/alpine/alpine-cloudosv2-base-nodejs-12'
          sh """
            cp -r ${env.WORKSPACE}/.git ./
            cp ${env.WORKSPACE}/.npmrc ./
            cp ${env.WORKSPACE}/package* ./
          """
          docker.image(image_name).inside("-u root --entrypoint ''") {
            sh 'npm install --only=prod'
          }

          scan.run_scan([
            'repository': 'bim360/reports-api',
            'product_output': "${scansDir}/node_modules",
            'report_access': [
              'jhoanegar@gmail.com',
            ]
          ])
        }
      }
    }
  )

  if (env.BRANCH_NAME == 'master') {
    stage ('Publish images to artifactory') {
      parallel(
        'Publish deployable image': {
          common_ci.app_package_and_publish(
            dockerfile_path: './docker/images/app/Dockerfile',
            deployable_image: common_cd.get_deployable_image(),
            update_latest: true
          )
        },
        'Publish CD test image': {
          common_ci.app_package_and_publish(
            dockerfile_path: 'docker/images/CD/Dockerfile',
            deployable_image: common_cd.get_deployable_image() + '-test',
            update_latest: true
          )
        }
      )
    }

    stage('Trigger deployment') {
      build job: '/BIM360/b360rpt-app/master',
        parameters: [
          [$class: 'StringParameterValue', name: 'moniker', value: 'b360rpt-c-uw2-v2'],
          [$class: 'StringParameterValue', name: 'deployment_strategy', value: 'dbgdm'],
        ],
        wait: false
    }
  }
}

def get_common_functions(commonType, verTag='') {
  def folder = 'common-functions'
  def versionTag = verTag
  def commonFile = 'common'
  def checkoutCMD = "git checkout tags/${versionTag}"
  def commonGitURL = 'https://git.github.com/BIM360/bim360-shared-jenkins-groovy.git'

  if (commonType.equalsIgnoreCase('common_fe')){
    commonFile = 'fepipeline'
    commonGitURL = 'https://git.github.com/BIM360/devops-shared-jenkins-groovy.git'
  }

  def commonPath = "${folder}/${commonFile}.groovy"

  sh "rm -rf ${folder} || true"

  dir(folder) {
    git url: commonGitURL, credentialsId: 'BIM360-git-integration'
    sh checkoutCMD
  }

  return load(commonPath)
}
