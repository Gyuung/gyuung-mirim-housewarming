# Git 저장소 업로드 가이드

이 문서는 현재 프로젝트를 로컬 Git 저장소로 만들고 GitHub 원격 저장소에 올리는 절차입니다.

## 1. 현재 폴더 확인

프로젝트 폴더로 이동합니다.

```bash
cd C:\Users\Wang\Desktop\houseparty
```

## 2. Git 저장소 초기화

```bash
git init
```

초기화가 끝나면 현재 폴더에 `.git` 폴더가 생성됩니다.

## 3. 현재 변경 파일 확인

```bash
git status
```

`node_modules`, `.next`, 로그 파일, `.env` 파일은 `.gitignore`에 의해 제외됩니다.

## 4. 파일 스테이징

```bash
git add .
```

다시 확인합니다.

```bash
git status
```

## 5. 첫 커밋 만들기

```bash
git commit -m "Initial housewarming invitation app"
```

## 6. GitHub에서 새 저장소 만들기

GitHub 웹사이트에서 새 저장소를 만듭니다.

예시:

```text
Repository name: houseparty
Visibility: Public 또는 Private
```

주의: GitHub에서 README, .gitignore, license를 자동 생성하지 않는 편이 충돌이 적습니다.

## 7. 원격 저장소 연결

GitHub에서 만든 저장소 주소를 복사한 뒤 아래 명령을 실행합니다.

HTTPS 예시:

```bash
git remote add origin https://github.com/YOUR_USERNAME/houseparty.git
```

SSH 예시:

```bash
git remote add origin git@github.com:YOUR_USERNAME/houseparty.git
```

연결 확인:

```bash
git remote -v
```

## 8. 브랜치 이름 main으로 변경

```bash
git branch -M main
```

## 9. GitHub에 push

```bash
git push -u origin main
```

처음 push할 때 GitHub 로그인을 요구할 수 있습니다.

## 10. 이후 변경사항 올리기

파일을 수정한 뒤에는 아래 흐름을 반복합니다.

```bash
git status
git add .
git commit -m "Update invitation design"
git push
```

## 자주 생기는 문제

### remote origin already exists

이미 원격 저장소가 연결되어 있을 때 발생합니다.

현재 원격 확인:

```bash
git remote -v
```

기존 origin 제거 후 다시 연결:

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/houseparty.git
```

### push 권한 오류

HTTPS 주소를 쓰는 경우 GitHub 비밀번호 대신 Personal Access Token이 필요할 수 있습니다.

SSH 주소를 쓰는 경우 로컬 SSH key가 GitHub 계정에 등록되어 있어야 합니다.

### 다른 저장소 내용과 충돌

GitHub에서 README 등을 미리 만든 경우 로컬 첫 push가 거절될 수 있습니다.

가장 단순한 방법은 GitHub 저장소를 빈 저장소로 새로 만들고 다시 push하는 것입니다.
