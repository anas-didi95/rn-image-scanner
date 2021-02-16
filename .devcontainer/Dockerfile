# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.158.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 14, 12, 10
ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends curl git unzip xz-utils zip libglu1-mesa openjdk-11-jdk wget \
  && rm -rf /var/lib/apt/lists/*

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"

# Prepare Android directories
USER node
WORKDIR /home/node
ENV ANDROID_SDK_ROOT /home/node/Android/sdk
ENV ANDROID_HOME /home/node/Android/sdk
RUN mkdir -p Android/sdk .android && touch .android/repositories.cfg

# Set up Android SDK
RUN wget -O sdk-tools.zip https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip \
  && unzip sdk-tools.zip && rm sdk-tools.zip \
  && mv tools Android/sdk/tools && cd Android/sdk/tools \
  && mkdir jaxb_lib \
  && wget https://repo1.maven.org/maven2/javax/xml/bind/jaxb-api/2.3.1/jaxb-api-2.3.1.jar -O jaxb_lib/jaxb-api.jar \
  && wget https://repo1.maven.org/maven2/org/glassfish/jaxb/jaxb-core/2.3.0.1/jaxb-core-2.3.0.1.jar -O jaxb_lib/jaxb-core.jar \
  && wget https://repo1.maven.org/maven2/com/sun/xml/bind/jaxb-impl/2.3.0.1/jaxb-impl-2.3.0.1.jar -O jaxb_lib/jaxb-impl.jar \
  && wget https://repo1.maven.org/maven2/org/glassfish/jaxb/jaxb-jxc/2.3.3/jaxb-jxc-2.3.3.jar -O jaxb_lib/jaxb-jxc.jar \
  && wget https://repo1.maven.org/maven2/org/glassfish/jaxb/jaxb-xjc/2.3.3/jaxb-xjc-2.3.3.jar -O jaxb_lib/jaxb-xjc.jar \
  && wget https://repo1.maven.org/maven2/javax/activation/activation/1.1.1/activation-1.1.1.jar -O jaxb_lib/activation.jar \
  && wget https://repo1.maven.org/maven2/com/sun/istack/istack-commons-runtime/3.0.11/istack-commons-runtime-3.0.11.jar -O jaxb_lib/istack-commons-runtime.jar \
  && sed -ie 's%^CLASSPATH=.*%\0:$APP_HOME/jaxb_lib/*%' bin/sdkmanager bin/avdmanager \
  && yes | ./bin/sdkmanager --licenses \
  && ./bin/sdkmanager "build-tools;29.0.2" "patcher;v4" "platform-tools" "platforms;android-29" "sources;android-29"

# Prepare system variables
ENV PATH "$PATH:/home/node/Android/sdk/platform-tools"
ENV PATH "$PATH:/home/node/Android/sdk/emulator"
ENV PATH "$PATH:/home/node/Android/sdk/tools"
ENV PATH "$PATH:/home/node/Android/sdk/tools/bin"
